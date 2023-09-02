import React, { useEffect, useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Postlist() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 15;
  // useEffect(()=>{
  //   fetch("http://localhost/wp-headless/wordpress/wp-json/wp/v2/posts/")
  //   .then((res)=>res.json())
  //   .then((data)=> setUsers(data))

  // },[]);

  useEffect(() => {
    let url = (`http://localhost/wp-headless/wordpress/wp-json/wp/v2/posts/?per_page=${perPage}&page=${currentPage}`);
    axios.get(url).then((res) => {
      const { data, headers } = res;
      console.log("headers", headers['x-wp-totalpages']);
      setTotalPages(Number(headers['x-wp-totalpages']));
      setUsers(data);
    });


  }, [currentPage]);
  console.log("post data", users);
  return (
    <>
     <Head>
      <title>Blog</title>
     </Head>
     
      <div className="h-[60vh] min-h-[20rem]  bg-[url('/home1.jpg')]  bg-cover relative">
        <div className='absolute bg-slate900 inset-0 z-0 opacity-40'></div>
        <div className='contianer lg:max-w-4xl mx-auto'>
          <SiteHeader className='header-blog-home z-10 relative' />
        </div>
        <h1 className='text-6xl text-center text-slate-100 relative z-10 py-10'>BLOG</h1>
        <p className='relative text-center text-slate-200 text-3xl'>Read our latest articles</p>
      </div>
      
      <main>
        <section className='bg-slate-200 p-5 min-h-screen'>
          <div className='max-w-5xl mx-auto text-center'>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5'>
              {
                Object.keys(users).length ? users.map(post => {
                  return (
                    <>
                      <Card sx={{ maxWidth: 345 }} key={post.id}>
                        <CardActionArea>
                          <CardMedia
                            className='w-full h-64 object-cover'
                            component="img"
                            image={post.fimg_url}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                              {post.title.rendered}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <Link href={`/blog/${post.id}`}>
                                <span dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></span>
                              </Link>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </>
                  )
                }) : (
                  <div className='col-span-3 w-5 h-5 absolute left-1/2 top-1/2 rounded-full border-2 border-b-0 border-blue-500 animate-spin' />

                )
              }
            </div>

            {/* // Pagination */}
            <div className='w-1/2 py-10 m-auto flex justify-between align-middle flex-wrap gap-10 items-center'>

              <button className='btn-primary p-2 bg-blue-500 rounded-lg hover:shadow-lg disabled:opacity-50 text-lg'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>

              <span className='text-lg font-bold'>{currentPage} of {totalPages}</span>

              <button className='btn-primary p-2 bg-blue-500 rounded-lg hover:shadow-lg disabled:opacity-50 text-lg'
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </div>

          </div>
        </section>
      </main>

    </>


  )
}
// data k aii vabe pete pari ba react useState ar madhome pete pari.
// export async function getStaticProps(ctx){
//   const res = await fetch("http://localhost/wp-headless/wordpress/wp-json/wp/v2/posts/");
//   const data = await res.json();
//   return{
//     props:{
//       data: data,
//     }
//   }
// }
export default Postlist;