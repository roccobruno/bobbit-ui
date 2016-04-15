package co.uk.bobbit.api;

import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * Handles requests for the application home page.
 */
@Controller
@PropertySource("classpath:git.properties")
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Value("${git.branch}")
	private String commitBranch;
	@Value("${git.commit.time}")
	private String commitDate;
	@Value("${git.commit.id}")
	private String commitHash;
    @Value("${git.commit.message}")
	private String commitMessage;
	

	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		return "project";
	}
	
//	@RequestMapping(value = "/api/status", method = RequestMethod.GET)
//	public @ResponseBody GitStatus status() {
//
//		return new GitStatus(commitBranch,commitHash,commitDate,commitMessage);
//	}
	
	@RequestMapping(value = "/index/", method = RequestMethod.GET)
	public @ResponseBody void index() {
		logger.info("-------- Indexing Controller");
	}
	
	
}
