from requests_html import HTMLSession
from bs4 import BeautifulSoup
import time
import requests

url = 'https://melsu.ru'

class Scraper():
    def scrapedata(self, id):
        http = f'{url}/news/show/{id}'
        s = HTMLSession()
        r = s.get(http)

        if r.status_code != 200:
            return None  # Страница не существует

        header_el = r.html.find('h1.text-4xl.font-bold.block.pb-2', first=True)
        if not header_el:
            return None  # Страница без нужной структуры

        header = header_el.text.strip()

        content_el = r.html.find('div.content-news.mb-3', first=True)
        content = content_el.html if content_el else "Контент не найден"

        date_el = r.html.xpath('//span[i[contains(@class, "bi-calendar2-week")]]', first=True)
        date = date_el.text.strip().split()[0] if date_el else "Дата не найдена"

        # Первая картинка
        first_img = None
        if content_el:
            img_el = content_el.find('img', first=True)
            if img_el:
                src = img_el.attrs.get('src', '')
                first_img = f'{url}/{src[6:]}' if src.startswith('../') else src
            else:
                first_img = self.find_image_on_other_pages(id)

        # Абсолютные пути для всех картинок
        soup = BeautifulSoup(content, 'html.parser')
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if src.startswith('../'):
                img['src'] = f'{url}/{src[6:]}'
        content = str(soup)

        return {
            'id': id,
            'title': header,
            'description': content,
            'image': first_img,
            'date': date     
        }

    def find_image_on_other_pages(self, news_id):
        """
        Функция для поиска изображения на других страницах новостей.
        Перебирает страницы до тех пор, пока не найдет новость с изображением.
        """
        s = HTMLSession()
        page = 1
        while True:
            print(f"Ищем изображение для новости #{news_id} на странице {page}...")
            http = f'{url}/news?page={page}'
            r = s.get(http)

            if r.status_code != 200:
                return None  # Страница не существует или ошибка при запросе

            # Ищем все элементы <a> с ссылкой на новость по нужному id
            links = r.html.find(f'a[href="{url}/news/show/{news_id}"]')

            if not links:
                page += 1
                time.sleep(1)
                continue

            for link in links:
                img_tag = link.find('img', first=True) 
                if img_tag:
                    img_src = img_tag.attrs.get('src', '')
                    return f"{url}{img_src[0:]}" if img_src.startswith('/') else img_src

            page += 1
            time.sleep(0.25)

        return "https://placehold.co/600x400.png"  # Если не нашли, ставим заглушку

    def send_to_fastapi(self, data):
        url = "http://192.168.167.48:8000/news/"
        payload = {
            "scrap_id": data['id'],
            "title": data['title'],
            "description": data['description'],
            "image_path": data['image'],
            "date": data['date']
        }

        try:
            response = requests.post(url, json=payload)
            if response.status_code == 200:
                print(f"✅ Успешно отправлено в FastAPI: {data['id']} - {data['title']}")
            else:
                print(f"❌ Ошибка при отправке: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"❌ Исключение при отправке: {e}")

    def scrap_all(self, start_id=200):
        id = start_id
        while True:
            print(f'Парсим новость #{id}...')
            data = self.scrapedata(id)
            if data:
                print(f"✅ {data['title']} ({data['date']})")
                self.send_to_fastapi(data)
            else:
                print(f"❌ Новость #{id} пропущена (не найдена или битая).")
            
            id += 1
            time.sleep(0.5)

# Запуск парсера
scraper = Scraper()
scraper.scrap_all()
