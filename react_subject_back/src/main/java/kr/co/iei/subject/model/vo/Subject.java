package kr.co.iei.subject.model.vo;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Alias(value="subject")
public class Subject {
	
	private Integer subjectNo;
	private String subjectTitle;
	private String subjectInstructor;
	private Integer subjectCategory;
	private Integer subjectLevel;
	private Integer subjectCount;
	private Integer order; //정렬
	private Integer searchType; //검색어 받는
	private String searchKeyword; // 검색어 받는    
	
}
