package com.springbootstudy.wheader.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springbootstudy.wheader.domain.Member;
import com.springbootstudy.wheader.mapper.MemberMapper;

@Service
public class MemberService {
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired
	private PasswordEncoder passWordEncoder;
	
	public int login(String id, String pass) {
		int result=-1;
		
		Member m = memberMapper.getMember(id);
		
		if(m==null) {return result;}
		if(passWordEncoder.matches(pass, m.getPass())){
			result=1;
		}else {
			result=0;
		}
		return result;
	}
	
	public Member getMember(String id) {
		return memberMapper.getMember(id);
	}
}
