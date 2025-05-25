"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Image from "next/image";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").max(80, "Name is too long"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Please provide more details"),
});

export default function ContactForm() {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    // Add your form submission logic here
    setSubmitting(false);
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="w-full">
          {" "}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-dark dark:text-light">
              Name
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Enter Name"
              className={`bg-transparent text-lg px-0 py-2 outline-none border-0 border-b-2  ${
                errors.name && touched.name
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-500"
              } transition-colors`}
            />
            {errors.name && touched.name && (
              <div className="text-red-500 text-sm mt-1">{errors.name}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-dark dark:text-light">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              className={`bg-transparent text-lg px-0 py-2 outline-none border-0 border-b-2 focus:border-b-2 ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-500"
              } focus:border-dark dark:focus:border-light transition-colors`}
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-dark dark:text-light">
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              placeholder="What's on your mind?"
              rows={4}
              className={`bg-transparent text-lg px-0 py-2 outline-none border-0 border-b-2 focus:border-b-2 resize-none ${
                errors.description && touched.description
                  ? "border-red-500"
                  : "border-gray-200 dark:border-gray-500"
              } transition-colors`}
            />
            {errors.description && touched.description && (
              <div className="text-red-500 text-sm mt-1">
                {errors.description}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 self-start font-medium text-sm px-8 py-3 bg-dark text-light rounded-lg 
            hover:bg-gray-800 hover:shadow-lg transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed flex flex-row gap-2"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
            <Image
              src="/images/send-icon.png"
              alt="Phone icon"
              width={20}
              height={20}
            />
          </button>
        </Form>
      )}
    </Formik>
  );
}
