using CRUDWebAPI_UsingEF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CRUDWebAPI_UsingEF.Controllers
{
    public class EmployeesController : ApiController
    {
        [HttpGet]
        public HttpResponseMessage get()
        {
            List<TblCrudNetCore> emplist = new List<TblCrudNetCore>();
            using (AspNetCoreDBEntities Dbcontext=new AspNetCoreDBEntities())
            {
                emplist= Dbcontext.TblCrudNetCores.ToList();
                if(emplist.Count==0)
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError,"Please try again later");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, emplist);
                }
            }
        }

        [HttpGet]
        public HttpResponseMessage get(int id)
        {
            using (AspNetCoreDBEntities Dbcontext = new AspNetCoreDBEntities())
            {
                var emp= Dbcontext.TblCrudNetCores.FirstOrDefault(e => e.ID == id);
                if(emp!=null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, emp);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "This employee not found.");
                }
            }
        }
        [HttpPost]
        public HttpResponseMessage Post(TblCrudNetCore emp)
        {
            using (AspNetCoreDBEntities Dbcontext = new AspNetCoreDBEntities())
            {
                if (emp != null)
                {
                    Dbcontext.TblCrudNetCores.Add(emp);
                    Dbcontext.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created, "Record inserted successfully.");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Please provide required information.");
                }
            }
        }
        [HttpPut]
        public HttpResponseMessage Put(int id,TblCrudNetCore employee)
        {
            using (AspNetCoreDBEntities Dbcontext = new AspNetCoreDBEntities())
            {
                var emp = Dbcontext.TblCrudNetCores.FirstOrDefault(e => e.ID == id);
                if (emp != null)
                {
                    emp.Name = employee.Name;
                    emp.Email = employee.Email;
                    emp.IsActive = employee.IsActive;
                    emp.CreatedOn = employee.CreatedOn;
                    Dbcontext.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created, "Record Updated successfully.");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "This employee id not found.");
                }
            }
        }
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            using (AspNetCoreDBEntities Dbcontext = new AspNetCoreDBEntities())
            {
                var emp = Dbcontext.TblCrudNetCores.FirstOrDefault(e => e.ID == id);
                if (emp != null)
                {
                    Dbcontext.TblCrudNetCores.Remove(emp);
                    Dbcontext.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.Created, "Record Deleted successfully.");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "This employee id not found.");
                }
            }
        }
    }
}
