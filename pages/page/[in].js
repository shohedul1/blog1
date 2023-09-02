import SiteHeader from '@/components/SiteHeader';
import Head from 'next/head';
import React from 'react'

function Pages({data}) {
  console.log(data);
  return (
    <>
    <Head>
      <title >{data.title.rendered}</title>
      <meta name="description" content={data.excerpt} key="metadescription" />
    </Head>
    <section className=' bg-slate-700 bg-opacity-70 absolute w-full z-20'>
      <SiteHeader className="header-single-post z-10 relative"/>
    </section>
    <article>
      <section className='hero-area h-[60vh] min-h-[30rem] bg-no-repeat bg-cover bg-center relative' style={ { backgroundImage: `url(${data.fimg_url})` } }>
       <div className='absolute inset-0  bg-slate-900  opacity-40'></div>
       <div className='container mx-auto h-full flex flex-col justify-center lg:max-w-4xl'>
        <h1 className="text-6xl text-center text-slate-100 relative x-10 py-8 mt-12">{data.title.rendered}</h1>
        <div className='relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200' dangerouslySetInnerHTML={{ __html: data.excerpt.rendered }}></div>
       </div>
      </section>
      <section className='content-area py-8'>
      <div className='post-content container lg:max-w-4xl mx-auto' dangerouslySetInnerHTML={{ __html: data.content.rendered }}></div>
      </section>
    </article>
    
    </>
  )
}
//amr data id aii vabe dhorte pari abong next.js  useRouter aii dhorte pari
export async function getStaticProps(ctx){
  const {params} = ctx;
  const res = await fetch(`http://localhost/wp-headless/wordpress/wp-json/wp/v2/pages/${params.id}`);
  const data = await res.json();
  return{
    props:{
      data: data,
    }
  }
}

export async function getStaticPaths(){
  const res = await fetch("http://localhost/wp-headless/wordpress/wp-json/wp/v2/pages/");
  const data = await res.json();
  const paths = data.map(post =>{
    return{
      params: {id: `${post.id}`},
    };
  });
  return{
    paths: paths,
    fallback: true,
  };
}

export default Pages;