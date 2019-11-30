package com.loyalty.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.loyalty.products.pojo.ProductsList;
import com.loyalty.products.process.IGetProducts;

@Controller
public class MarketPlaceController {
	
	private IGetProducts<ArrayList<ProductsList>> productsProcess;
	

	@RequestMapping(value = "/catalog")
	public ModelAndView getCatalog(ModelAndView model, HttpServletRequest request) {
		ArrayList<ProductsList> productsList = null;

		ModelAndView newModel = new ModelAndView();
		try {
			productsList = productsProcess.getAllProducts();
			
			newModel.addObject("productsList", productsList);

			newModel.setViewName("Catalogs");
			
		} catch (Exception e) {
			System.out.println(e);
			return new ModelAndView("redirect:/sessionErrorPs");
			
		}
		
		
		
		
		return model;
		
		
	}
}
