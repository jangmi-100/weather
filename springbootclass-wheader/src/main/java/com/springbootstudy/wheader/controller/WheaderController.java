package com.springbootstudy.wheader.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class WheaderController {

	@GetMapping({"/","index"})
	public String MainWheader(Model model) {
		
		return "vews/index";
	}
	
	@GetMapping("/layout-static")
	public String layout_static(Model model) {
		
		return "vews/layout-static";
	}
	@GetMapping("/layout-sidenav-light")
	public String layout_sidenav_light(Model model) {
		
		return "vews/layout-sidenav-light";
	}
	@GetMapping("/login")
	public String login(Model model) {
		
		return "vews/login";
	}
	@GetMapping("/register")
	public String register(Model model) {
		
		return "vews/register";
	}
	@GetMapping("/password")
	public String password(Model model) {
		
		return "vews/password";
	}
	
	@GetMapping("/charts")
	public String charts(Model model) {
		
		return "vews/charts";
	}
	
	@GetMapping("/tables")
	public String tables(Model model) {
		
		return "vews/tables";
	}
}
