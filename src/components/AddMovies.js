import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddMovies = (props) => {

    const [formData,setFormData]=useState({title:"",opening_crawl:"",director:""});

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
       

    }
    const formSubmitHandler=(e)=>{
        e.preventDefault();
       props.addMovieDataHandler(formData);
      
       setFormData({title:"",opening_crawl:"",director:""});

    }


    
  return (
    <Form onSubmit={formSubmitHandler} className="w-50 h-50 m-auto p-3 border border-3">
    <h2 className="text-center ">Add Movies</h2><hr/>
        <Form.Group className="mt-3">
            <Form.Label htmlFor="title" >Title</Form.Label>
            <Form.Control id="title" type="text" value={formData.title} name="title" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mt-3">
            <Form.Label htmlFor="opening_crawl" >Opening_crawl</Form.Label>
            <Form.Control id="opening_crawl" type="text"  value={formData.opening_crawl} name="opening_crawl" onChange={handleChange}/>
        </Form.Group>
        <Form.Group className="mt-3">
            <Form.Label htmlFor="director" >Director</Form.Label>
            <Form.Control id="director" type="text" value={formData.director}  name ="director" onChange={handleChange}/>
        </Form.Group>
        <Button  type="submit" className="mt-3   btn btn-primary w-auto h-75 ">Add Movies</Button>

    </Form>

  ) 
};

export default AddMovies;
