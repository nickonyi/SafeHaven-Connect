import Post from '../post/Post'
import './posts.scss'

function Posts() {
  const posts = [
    {
      id: 1,
      name:'Sofia darbun',
      desc: "Love For All, Hatred For None.",
      photo: "https://images.pexels.com/photos/20564358/pexels-photo-20564358/free-photo-of-a-woman-standing-by-a-lake-with-a-cell-phone.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      date: "5 mins ago",
      userId: 1,
      like: 32,
      comment: 9,
    },
    {
      id: 2,
      name: 'John Doe',
      desc: "Love For All, Hatred For None.",
      photo: "https://images.pexels.com/photos/15497752/pexels-photo-15497752/free-photo-of-close-up-of-an-umbrella-plant.jpeg",
      date: "15 mins ago",
      userId: 2,
      like: 2,
      comment: 1,
    },
    {
      id: 3,
      name: 'Jane Smith',
      desc: "Every moment is a fresh beginning.",
      photo: "https://images.pexels.com/photos/23914397/pexels-photo-23914397/free-photo-of-sheep-in-a-field.jpeg",
      date: "1 hour ago",
      userId: 3,
      like: 61,
      comment: 2,
    },
    {
      id: 4,
      name: 'Alex Johnson',
      desc: "Spread love and kindness everywhere you go.",
      photo: "https://images.pexels.com/photos/20476928/pexels-photo-20476928/free-photo-of-sneakers-a-basketball-and-an-analog-camera-lying-on-an-old-rug.jpeg",
      date: "4 hours ago",
      userId: 4,
      like: 7,
      comment: 3,
    },
    {
      id: 5,
      name: 'Sarah Williams',
      desc: "Never regret anything that made you smile.",
      photo: "https://images.pexels.com/photos/7710997/pexels-photo-7710997.jpeg",
      date: "7 hours ago",
      userId: 5,
      like: 23,
      comment: 5,
    }
  ]
  return (
    <div className='posts'>
      {
        posts.map(post => (
          <Post key={post.id} post={post} />
        ))
      }
    </div>
  )
}

export default Posts


