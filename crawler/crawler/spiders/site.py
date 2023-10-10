from pathlib import Path
from urllib.parse import urljoin, urlparse

from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from slugify import slugify

################################################################################
# The below settings will crawl and save HTML pages from the
# https://store.google.com website, only crawl pages within the
# store.google.com subdomain, and only crawl pages within the product/ and
# category/ URL paths
#
# In other words, the below settings will crawl and save HTML pages at:
# https://store.google.com/product/*
# https://store.google.com/category/*
#
# Change the allowed_domains, start_urls, and allow rules to your liking.
################################################################################


class StoreSpider(CrawlSpider):
    name = "site"

    # List of the root domain(s) or subdomain(s) to filter
    allowed_domains = [
        "dora.dev",
    ]

    # List of the URL(s) that the crawler should start at
    start_urls = [
        "https://dora.dev/",
    ]

    # Rules to filter links by URL path/directory and follow links
    rules = (
        Rule(
            LinkExtractor(),
            callback="parse_item",
            follow=True,
        ),
    )

    # Settings to delay and slow crawling to avoid rate limiting
    custom_settings = {
        "AUTOTHROTTLE_ENABLED": True,
        "AUTOTHROTTLE_START_DELAY": 3,
        "AUTOTHROTTLE_MAX_DELAY": 5,
        "AUTOTHROTTLE_TARGET_CONCURRENCY": 0.5,
    }

    # Save each HTML page that is crawled in the local /html directory
    def parse_item(self, response):
        print("URL ##############################")
        print(urljoin(response.url, urlparse(response.url).path))
        slug = slugify(urljoin(response.url, urlparse(response.url).path),
                       replacements=[["/", "-slash-"]])
        print(slug)
        slug = slug.replace("-slash-slash-", "#$$")
        slug = slug.replace("-slash-", "$")
        slug = slug.replace("-slash", "$")
        print(slug)
        filename = f"html/{slug}.html"
        Path(filename).write_bytes(response.body)
        self.log(f"Saved file {filename}")
