package com.company.project.configuration;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.Charset;

/**
 * Read property from docker secret file.
 */
public class DockerSecretsProcessor implements EnvironmentPostProcessor {

	@Override
	public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
		Resource resourcePassword = new FileSystemResource("/run/secrets/db-password");
		if (resourcePassword.exists() && System.getProperty("MYSQL_PASSWORD") == null) {
			try {
				String dbPassword = StreamUtils.copyToString(resourcePassword.getInputStream(), Charset.defaultCharset());
				System.setProperty("MYSQL_PASSWORD", dbPassword);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		Resource resourceDatabase = new FileSystemResource("/run/secrets/db-database");
		if (resourceDatabase.exists() && System.getProperty("MYSQL_DATABASE") == null) {
			try {
				String dbDatabase = StreamUtils.copyToString(resourceDatabase.getInputStream(), Charset.defaultCharset());
				System.setProperty("MYSQL_DATABASE", dbDatabase);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		Resource resourceUser = new FileSystemResource("/run/secrets/db-user");
		if (resourceUser.exists() && System.getProperty("MYSQL_USER") == null) {
			try {
				String dbUser = StreamUtils.copyToString(resourceUser.getInputStream(), Charset.defaultCharset());
				System.setProperty("MYSQL_USER", dbUser);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		Resource resourceHost = new FileSystemResource("/run/secrets/db-host");
		if (resourceHost.exists() && System.getProperty("MYSQL_HOST") == null) {
			try {
				String dbHost= StreamUtils.copyToString(resourceHost.getInputStream(), Charset.defaultCharset());
				System.setProperty("MYSQL_HOST", dbHost);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}

//		SSO OAuth2 + Google
		Resource ssoClientID = new FileSystemResource("/run/secrets/client-id");
		if (resourceHost.exists() && System.getProperty("client-id") == null) {
			try {
				String clientID= StreamUtils.copyToString(ssoClientID.getInputStream(), Charset.defaultCharset());
				System.setProperty("client-id", clientID);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		Resource ssoClientSecret = new FileSystemResource("/run/secrets/client-secret");
		if (resourceHost.exists() && System.getProperty("client-secret") == null) {
			try {
				String clientSecret= StreamUtils.copyToString(ssoClientSecret.getInputStream(), Charset.defaultCharset());
				System.setProperty("client-secret", clientSecret);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
