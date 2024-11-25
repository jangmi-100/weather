package com.springbootstudy.wheader.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.springbootstudy.wheader.domain.Member;

@Mapper
public interface MemberMapper {
	
	public Member getMember(String id);
}
