import React, { useState } from "react";
import CourseForm from "./CourseForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

function CreateCourse(props) {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(false);
  const [category, setCategory] = useState("language"); 

  useEffect(() => {
    if (props.isUpdate) {
      setTitle(props.course.title);
      setDescription(props.course.description);
      setPrice(props.course.price);
      setImageLink(props.course.imageLink);
      setPublished(props.course.published);
      setCategory(props.course.category);
    }
  }, [props.course]);

  function createCourse() {
    fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        price,
        imageLink,
        published,
        category,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setDescription("");
        setImageLink("");
        setTitle("");
        setPrice("");
        setPublished(false); // Reset published state
        setCategory("language"); // Reset category
        navigate("/courses");
      })
      .catch((err) => console.log(err));
  }

  function updateCourse() {
    fetch(`http://localhost:3000/admin/courses/${props.course._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        price,
        imageLink,
        published,
        category,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        navigate(`/courses`);
      })
      .catch((err) => console.log(err));
  }

  return (
    <CourseForm
      isUpdate={props.isUpdate}
      createCourse={createCourse}
      updateCourse={updateCourse}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      price={price}
      setPrice={setPrice}
      imageLink={imageLink}
      setImageLink={setImageLink}
      published={published}
      setPublished={setPublished}
      category={category}
      setCategory={setCategory}
    />
  );
}

export default CreateCourse;
