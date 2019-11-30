package com.lifemiles;

import java.net.InetAddress;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;

import com.loyalty.configuration.EnableWebAutoConfiguration;

@SpringBootConfiguration
@EnableConfigurationProperties
@EnableWebAutoConfiguration
@ComponentScan("com.loyalty")
@ComponentScan(lazyInit = true)
public class MarketplaceViewsApplication extends WebMvcConfigurerAdapter{

	public static void main(String[] args) {
		Logger log=LoggerFactory.getLogger(MarketplaceViewsApplication.class);
		try {
			System.setProperty("hostname", InetAddress.getLocalHost().getHostName());
			SpringApplication.run(MarketplaceViewsApplication.class, args);
		}  catch (Exception e) {
			log.error("Error, error: {}", e + " en linea: "
					+ e.getStackTrace()[0].getLineNumber() + " en metodo: " + e.getStackTrace()[0].getMethodName());
		}
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(localeChangeInterceptor());
	}
	@Bean
    public LocaleResolver localeResolver() {
		CookieLocaleResolver clr = new CookieLocaleResolver();
		clr.setDefaultLocale(StringUtils.parseLocaleString("es") );
		return clr;
    }
 
    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        lci.setParamName("lang");
        return lci;
    }
   
}
