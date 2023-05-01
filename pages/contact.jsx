import Container from "@components/container";
import Layout from "@components/layout";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "use-web3forms";
import {
  MapPinIcon,
  MailIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";
import { createClient } from "prismicio";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
export default function Contact({contacts, siteconfig  }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm({
    mode: "onTouched"
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  // Please update the Access Key in the Sanity CMS - Site Congig Page
//   https://web3forms.com/#start
  const apiKey = process.env.NEXT_PUBLIC_WEB3_ACCESS_KEY

  const { submit: onSubmit } = useWeb3Forms({
    apikey: apiKey,
    // access_key: process.env.NEXT_PUBLIC_WEB3_ACCESS_KEY,
    from_name: "Stablo Template",
    subject: "New Contact Message from Stablo Website",
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    }
  });

  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl">
          {contacts?.results[0]?.data?.heading}
        </h1>
        <div className="text-center">
          <p className="text-md">{contacts?.results[0]?.data?.paragraph}</p>
        </div>

        <div className="grid my-10 md:max-w-xl md:mx-auto">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="my-10">
              <input
                type="checkbox"
                id=""
                className="hidden"
                style={{ display: "none" }}
                {...register("botcheck")}></input>

              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  autoComplete="false"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4  ${
                    errors.name
                      ? "border-red-600 focus:border-red-600 ring-red-100"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100"
                  }`}
                  {...register("name", {
                    required: "Full name is required",
                    maxLength: 80
                  })}
                />
                {errors.name && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.name.message}</small>
                  </div>
                )}
              </div>

              <div className="mb-5">
                <label htmlFor="email_address" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email_address"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="false"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4  ${
                    errors.email
                      ? "border-red-600 focus:border-red-600 ring-red-100"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100"
                  }`}
                  {...register("email", {
                    required: "Enter your email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email"
                    }
                  })}
                />
                {errors.email && (
                  <div className="mt-1 text-red-600">
                    <small>{errors.email.message}</small>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none  h-36 focus:ring-4  ${
                    errors.message
                      ? "border-red-600 focus:border-red-600 ring-red-100"
                      : "border-gray-300 focus:border-gray-600 ring-gray-100"
                  }`}
                  {...register("message", {
                    required: "Enter your Message"
                  })}
                />
                {errors.message && (
                  <div className="mt-1 text-red-600">
                    {" "}
                    <small>{errors.message.message}</small>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7">
                {isSubmitting ? (
                  <svg
                    className="w-5 h-5 mx-auto text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            {isSubmitSuccessful && isSuccess && (
              <div className="mt-3 text-sm text-center text-green-500">
                {message || "Success. Message sent successfully"}
              </div>
            )}
            {isSubmitSuccessful && !isSuccess && (
              <div className="mt-3 text-sm text-center text-red-500">
                {message || "Something went wrong. Please try later."}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}


export const getStaticProps = async () => {
  const client = createClient();
  const contactsResponse = await client.getByType('contatos');
  const contacts = {
      results: contactsResponse.results.map(item => {
        return {
          id: item.id,
          last_publication_date: format(
            new Date(item.last_publication_date),
            'dd LLL yyyy',
            {
              locale: ptBR,
            }
          ),
          data: {
            heading: item.data.slices[0].primary.title[0].text,
            paragraph: item.data.slices[0].primary.description[0].text,
          },
        };
      }),
    };

  return {
    props: {
      contacts,
    },
  };
};
