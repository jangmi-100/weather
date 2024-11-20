package com.springbootstudy.wheader.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class WheaderController {

	@GetMapping("/")
	public String index(Model model) {
		
		return "views/main";
	}
}
