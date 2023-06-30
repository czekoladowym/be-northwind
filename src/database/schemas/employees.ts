import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const employeesTable = sqliteTable('Employees', {
	id: text('EmployeeId').primaryKey(),
	lastName: text('LastName'),
	firstName: text('FirstName'),
	title: text('Title'),
	titleOfCourtesy: text('TitleOfCourtesy'),
	birthDate: text('BirthDate'),
	hireDate: text('HireDate'),
	adress: text('Adress'),
	city: text('City'),
});
