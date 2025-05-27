package com.mariaalbu.catdistributionsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class JdbcConfig {

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");

        String serverName = "catdistributiondb.postgres.database.azure.com";
        String databaseName = "postgres";
        String username = "postgres";
        String password = "MafinMafin_10";
        String port = "5432";

        //String jdbcUrl = String.format("jdbc:postgresql://%s:%s/%s?sslmode=disable", serverName, port, databaseName);

        dataSource.setUrl("jdbc:postgresql://catdistributiondb.postgres.database.azure.com:5432/postgres?user=postgres&password=MafinMafin_10&sslmode=require&connectTimeout=10&socketTimeout=30");
        dataSource.setUsername(username);
        dataSource.setPassword(password);

        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}