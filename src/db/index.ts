import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'trello',
    password: process.env.DB_PASSWORD || 'trello',
    database: process.env.DB_NAME || 'trello',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',

    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsRun: process.env.NODE_ENV === 'production',
};

const dataSource = new DataSource(dataSourceOptions as DataSourceOptions);

export default dataSource;