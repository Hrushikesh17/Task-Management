package com.hkp.TM.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.hkp.TM.DTO.TaskTable;
import com.hkp.TM.Repository.JpaTaskRepo;

@Repository
public class TaskService {
	
	@Autowired
     JpaTaskRepo repo;
	//Insert Task
	public TaskTable addtask(TaskTable tt) {
		repo.save(tt);
		return tt;
	}
	//ViewAll Task
	public List<TaskTable> viewtask() {
          return repo.findAll();
	}
    //SearchTask By Id 
	public TaskTable searchtask( int id) {
		Optional<TaskTable> tt = repo.findById(id);
		if(tt.isPresent()) {
			System.out.println("object is present");
			return tt.get();
		}
		return null;
	}
	//Delete task
	public void removetask(int id) {
	TaskTable tt = searchtask(id);
	if(tt!=null) {
		repo.delete(tt);
		System.out.println("Deleted");
	}
	else {
		System.out.println("id is not present");
	}
	}
	//Update Task
	public String updatetask(int id, String status,String name, String desc) {
		TaskTable tt = searchtask(id);
		if(tt!=null) {
			tt.setStatus(status);
			tt.setName(name);
			tt.setDescripction(desc);
			repo.save(tt);
			return "Updation Successfull..";
		}
		else {
			return "Task id not found";
		}
	}
	
	//HQL 
//	public List<TaskTable> serchspecific(){
//	   return repo.findByStatus();
//	}
//	
//	//Namtive
//	public List<TaskTable> seacrhbyname(){
//		return repo.findbyname();
//	}
//	
	public TaskTable taskFindbyName(String name) {
		return repo.findByName(name);
	}
	
}
