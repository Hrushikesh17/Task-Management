package com.hkp.TM.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hkp.TM.DTO.TaskTable;

public interface JpaTaskRepo extends JpaRepository<TaskTable, Integer> {
	
//	//JPA OR HQL Queary
//	@Query("select t from TaskTable t where t.status='Completed'")
//	public List<TaskTable> findByStatus();
//	
//	
//	//SQL Query
//	@Query( value="select * from task_table where name='Sql'",nativeQuery = true)
//	public List<TaskTable> findbyname();
//	
	
	//To create userInput or Dynamic query
	@Query("select t from TaskTable t where t.name=?1")
	public TaskTable findByName(String name);
}
