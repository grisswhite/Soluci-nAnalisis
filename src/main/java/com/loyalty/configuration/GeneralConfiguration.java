package com.loyalty.configuration;

import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.conn.HttpClientConnectionManager;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class GeneralConfiguration {

	private Environment env;
	
	@Autowired
	public GeneralConfiguration(Environment env){
		this.env=env;
	}
	
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder) {
		return restTemplateBuilder
				//.setConnectTimeout(30000)
				//.setReadTimeout(30000)
				.requestFactory(this::clientHttpRequestFactory)
				.build();
	}
	
	private HttpClientConnectionManager connManager() {
		PoolingHttpClientConnectionManager manager = new PoolingHttpClientConnectionManager();
		
		manager.setMaxTotal(Integer.parseInt(env.getProperty("service.configuration.http.max-threads")));
		manager.setDefaultMaxPerRoute(Integer.parseInt(env.getProperty("service.configuration.http.max-threads-per-route")));
		
		return manager;
	}
	
	private RequestConfig requestConfig() {
		return RequestConfig
				.custom()
				.setSocketTimeout(Integer.parseInt(env.getProperty("service.configuration.http.socket-timeout")))//Tiempo de espera a la peticion
				.setConnectionRequestTimeout(Integer.parseInt(env.getProperty("service.configuration.http.conn-request-timeout")))//time out hacia el pull de conexiones interno
				.setConnectTimeout(Integer.parseInt(env.getProperty("service.configuration.http.http-request-timeout")))//tiempo de espera
				.build();
	}
	
	private HttpClient httpClient() {
		return HttpClientBuilder
				.create()
				.setConnectionManager(connManager())
				.setDefaultRequestConfig(requestConfig())
				.build();
	}
	
	private ClientHttpRequestFactory clientHttpRequestFactory() {
	    HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
	    
	    factory.setHttpClient(httpClient());
	    
	    return factory;
	} 
	
}
