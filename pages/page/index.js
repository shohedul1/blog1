import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Index() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let url = (`http://localhost/wp-headless/wordpress/wp-json/wp/v2/pages?per_page=19`);
    axios.get(url).then((res) => {
      const { data } = res;
      setUsers(data);
    });

  }, []);
  console.log(users);
  return (

    <>
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
                              <Link href={`/page/${post.id}`}>
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

          </div>
        </section>
      </main>


    </>


  )
}

export default Index;