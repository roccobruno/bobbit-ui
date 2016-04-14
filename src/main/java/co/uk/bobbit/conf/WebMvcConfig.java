package co.uk.bobbit.conf;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.DefaultNamingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBuilder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


		
@ComponentScan("com.casarotto")		
@PropertySource({ "classpath:config.properties" })		
@EnableTransactionManagement
@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

	@Value(value="${datasource.url}")
	private String databaseUrl;
	
	@Value(value="${datasource.username}")
	private String databaseUsername;
	
	@Value(value="${datasource.password}")
	private String databasePassword;
	
	@Value(value="${hibernate.search.folder}")
	private String hibernateSearchFolder;
	
	@Value(value="${createDefaultUser}")
	boolean createDefaultUser;
	

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("").setViewName("project");
		registry.addViewController("/").setViewName("project");
		registry.addViewController("/home").setViewName("project");
		registry.addViewController("/client-document.html").setViewName(
				"client-document");
		registry.addViewController("/client.html").setViewName("client");
		registry.addViewController("/company.html").setViewName("company");
		registry.addViewController("/courtesycall.html").setViewName(
				"courtesycall");
		registry.addViewController("/crew.html").setViewName("crew");
		registry.addViewController("/edit-client.html").setViewName(
				"edit-client");
		registry.addViewController("/edit-company.html").setViewName(
				"edit-company");
		registry.addViewController("/edit-courtesycall.html").setViewName(
				"edit-courtesycall");
		registry.addViewController("/edit-crew.html").setViewName("edit-crew");
		registry.addViewController("/edit-project.html").setViewName(
				"edit-project");
		registry.addViewController("/project.html").setViewName("project");
		registry.addViewController("/login").setViewName("login");

	}

	/*
	 * @Override public void addInterceptors(InterceptorRegistry registry) {
	 * WebContentInterceptor interceptor = new WebContentInterceptor();
	 * 
	 * Properties mappings = new Properties(); mappings.put("/css", "2592000");
	 * mappings.put("/img", "2592000"); mappings.put("/js", "2592000");
	 * mappings.put("/static", "2592000");
	 * interceptor.setCacheMappings(mappings);
	 * 
	 * registry.addInterceptor(interceptor);
	 * 
	 * }
	 * 
	 * @Override public void addResourceHandlers(ResourceHandlerRegistry
	 * registry) {
	 * registry.addResourceHandler("/css/**").addResourceLocations("/css/");
	 * registry.addResourceHandler("/img/**").addResourceLocations("/img/");
	 * registry.addResourceHandler("/images/**").addResourceLocations(
	 * "/images/");
	 * registry.addResourceHandler("/js/**").addResourceLocations("/js/");
	 * registry.addResourceHandler("/static/**").addResourceLocations(
	 * "/static/");
	 * registry.addResourceHandler("/**").addResourceLocations("/"); }
	 */
	@Autowired
	@Bean(name = "sessionFactory")
	public SessionFactory getSessionFactory(DataSource dataSource) {

		LocalSessionFactoryBuilder sessionBuilder = new LocalSessionFactoryBuilder(
				dataSource);



		sessionBuilder.setProperty("hibernate.dialect",
				"org.hibernate.dialect.MySQLDialect");
		sessionBuilder.setProperty("hibernate.show_sql", "false");
		sessionBuilder.setProperty("hibernate.hbm2ddl.auto", "update");
		sessionBuilder.setProperty(
				"hibernate.search.default.directory_provider", "filesystem");
		sessionBuilder.setProperty("hibernate.search.default.indexBase",
				hibernateSearchFolder);
		sessionBuilder.setProperty("hibernate.search.lucene_version",
				"LUCENE_CURRENT");
		/*
		 * sessionBuilder.setProperty("hibernate.connection.driver_class",
		 * "com.mysql.jdbc.Driver");
		 */
		sessionBuilder.setProperty("hibernate.connection.url",databaseUrl);
		sessionBuilder.setProperty("hibernate.connection.username", databaseUsername);
		sessionBuilder.setProperty("hibernate.connection.password", databasePassword);

		sessionBuilder.setNamingStrategy(DefaultNamingStrategy.INSTANCE);

		return sessionBuilder.buildSessionFactory();
	}

	@Autowired
	@Bean(name = "transactionManager")
	public HibernateTransactionManager getTransactionManager(
			SessionFactory sessionFactory) {
		HibernateTransactionManager transactionManager = new HibernateTransactionManager(
				sessionFactory);

		return transactionManager;
	}

	// @Bean configurations go here...
	@Bean(name = "dataSource")
	public DataSource getDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();

		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		dataSource.setUrl(databaseUrl);
		dataSource.setUsername(databaseUsername);
		dataSource.setPassword(databasePassword);

		return dataSource;
	}

	@PostConstruct
	public void addUser() {


	}
	// ... other stuff ...
}
