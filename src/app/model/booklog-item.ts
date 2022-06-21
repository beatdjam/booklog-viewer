export class BooklogItem {
    constructor(
        public serviceId: string,
        public itemId: string,
        public isbn13: string,
        public category: string,
        public rank: string,
        public status: string,
        public reviewComment: string,
        public tags: string,
        public memo: string,
        public createAt: Date,
        public readAt: Date,
        public title: string,
        public author: string,
        public publisher: string,
        public publishedAt: Date,
        public genre: string,
        public pages: string,
    ) {
    }
}
