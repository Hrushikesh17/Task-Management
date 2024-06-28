package com.hkp.TM.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hkp.TM.DAO.TaskService;
import com.hkp.TM.DTO.TaskTable;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TaskContrller {
	
	   @Autowired
       TaskService ts;
	   
	   @PostMapping("/insert")
	   public TaskTable insert(@RequestBody TaskTable tt) {
		   ts.addtask(tt);
		   return tt;
	   }
	   
	   @GetMapping("/view")
	   public List<TaskTable> view(){
		  return ts.viewtask();
	   }
	   
	   @GetMapping("/search")
	   public TaskTable search(@RequestParam int id) {
		   return ts.searchtask(id);
	   }
	   
	   @DeleteMapping("/remove")
	   public  void delete(@RequestParam int id) {
		   ts.removetask(id);
	   }
	   
	   @PutMapping("/update")
	   public String update(@RequestParam int id, @RequestParam String status,@RequestParam String name, @RequestParam String desc) {
		   return ts.updatetask(id, status, name, desc);
	   }
	   
//	   @GetMapping("/sbystatus")
//	   public List<TaskTable> sBS() {
//		   return ts.serchspecific();
//	   }
//	   
//	   @GetMapping("/sbyname")
//	   public List<TaskTable> sbn(){
//		   return ts.seacrhbyname();
//	   }
	   
	   @GetMapping("/ftbn")
	   public TaskTable findtaskbname(@RequestParam String name) {
		   return ts.taskFindbyName(name);
	   }
}
