import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const suppliesTable = sqliteTable('Supplies', {
	id: text('SupplierId').primaryKey(),
	company: text('CompanyName'),
	contact: text('ContactName'),
	title: text('ContactTitle'),
	address: text('Address'),
	city: text('City'),
	region: text('Region'),
	postal: text('PostalCode'),
	country: text('Country'),
	phone: text('Phone'),
	fax: text('Fax'),
	homePage: text('HomePage'),
});
