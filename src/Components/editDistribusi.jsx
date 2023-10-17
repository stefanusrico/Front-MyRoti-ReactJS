//import useState
import { useState, useEffect } from 'react';

//import useNavigate
import { useNavigate, useParams } from 'react-router-dom';

//import API
import api from "../api";

export default function PostEdit() {

    //define state
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    //state validation
    const [errors, setErrors] = useState([]);

    //useNavigate
    const navigate = useNavigate();

    //destruct ID
    const { id } = useParams();

    //method fetchDetailPost
    const fetchDetailPost = async () => {
        
        //fetch data
        await api.get(`/api/registrasi/${id}`)
            .then(response => {
                
                //assign to state
                setName(response.data.name);
                setUsername(response.data.username);
                setRole(response.data.role);
            })
    }

    //hook useEffect
    useEffect(() => {
        
        //call method "fetchDetailPost"
        fetchDetailPost();

    }, []);

    //method handle file change
    

    //method update post
    const updatePost = async (e) => {
        e.preventDefault();
        
        //init FormData
        const formData = new FormData();

        //append data
        formData.append('name', name);
        formData.append('username', username);
        formData.append('role', role);
        formData.append('_method', 'PUT')

        //send data with API
        await api.post(`/api/registrasi/${id}`, formData)
            .then(() => {
                
                //redirect to posts index
                navigate('/post');

            })
            .catch(error => {
                
                //set errors response to state "errors"
                setErrors(error.response.data);
            })
    }

    return (
        <div className="container mt-5  bg-coklat-kuning ">
            <div className="row">
                
                            <form onSubmit={updatePost}>    
                            

                                <div className="mb-3  bg-coklat-kuning ">
                                    <label className="form-label fw-bold ">Title</label>
                                    <input type="text" className="form-control " value={name} onChange={(e) => setName(e.target.value)} placeholder="Name Post"/>
                                    {
                                        errors.name && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.name[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3  bg-coklat-kuning ">
                                    <label className="form-label fw-bold">username</label>
                                    <textarea className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} rows="5" placeholder="Username Post"></textarea>
                                    {
                                        errors.username && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.username[0]}
                                            </div>
                                        )
                                    }
                                </div>
                                
                                <div className="mb-3 bg-coklat-kuning ">
                                    <label className="form-label fw-bold">role</label>
                                    <textarea className="form-control" value={role} onChange={(e) => setRole(e.target.value)} rows="5" placeholder="role Post"></textarea>
                                    {
                                        errors.role && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.role[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                            </form>
                        </div>
                   
        </div>
    )
}