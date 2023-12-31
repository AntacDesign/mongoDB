import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const New = () => {
  //agregando el router
  const router = useRouter()

  //creando constantes
  const [form, setForm] = useState({ title: "", plot: "" });
  const [message,setMessage] = useState([])

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(form);
  };

  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);

      if(!data.success){
        for (const key in data.error.errors) {
          let error = data.error.errors[key]
          setMessage(oldmessage=>[
            ...oldmessage,
            {message:error.message}
          ]);
        }
      }else{
        router.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="contaniner mx-2">
        <h1 className="my-3">Agregar Movie</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control my-2"
            type="text"
            placeholder="Title"
            autoComplete="off"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <input
            className="form-control my-2"
            type="text"
            placeholder="Plot"
            autoComplete="off"
            name="plot"
            value={form.plot}
            onChange={handleChange}
          />
          <button className="btn btn-primary w-100 my-2" type="submit">
            Agregar
          </button>
          <Link href="/" className="btn btn-warning w-100">
            Volver...
          </Link>
          {
            message.map(({message})=>(
              <p key={message}>{message}</p>
            ))
          }
        </form>
      </div>
    </>
  );
};

export default New;
