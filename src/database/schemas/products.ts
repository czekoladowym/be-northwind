import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const productsTable = sqliteTable('Products', {
	productId: text('ProductId').primaryKey(),
	name: text('ProductName'),
	supplierId: text('SupplierId'),
	categoryId: text('CategoryId'),
	quantity: text('QuantityPerUnit'),
	price: text('UnitPrice'),
	stock: text('UnitsInStock'),
	order: text('UnitsOnOrder'),
	reorderLevel: text('ReorderLevel'),
	discontinued: text('Discontinued'),
});
