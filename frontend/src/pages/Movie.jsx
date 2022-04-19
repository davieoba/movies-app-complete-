import styles from './movie.module.css'
import Header from './../components/Header'
import Footer from './../components/Footer'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMovie, reset } from './../features/movies/movies-slice'
import { createReview, getReviews } from './../features/reviews/review-slice'
import { useParams } from 'react-router-dom'
import logo from './../img1.jpg'
import { unwrapResult } from '@reduxjs/toolkit'

function Movie() {
  const [showReview, setShowReview] = useState(false)
  const { id } = useParams()
  const { movie } = useSelector((state) => state.movie)
  const { user } = useSelector((state) => state.auth)
  const { reviews } = useSelector((state) => state.review)
  const dispatch = useDispatch()

  const [reviewForm, setReviewForm] = useState({
    rating: '',
    review: ''
  })

  // console.log(movie)
  // console.log(id)
  // console.log(user)
  useEffect(() => {
    const fn = async () => {
      try {
        const response = await dispatch(getMovie(id))
        // const data = unwrapResult(response)

        const reviewRes = await dispatch(getReviews(id))
        // const reviewData = unwrapResult(reviewRes)
      } catch (err) {
        console.log(err)
      }
    }

    fn()
  }, [id, getReviews, getMovie])

  function handleChange(e) {
    setReviewForm((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type === 'checkbox' ? e.target.checked : e.target.value
      }
    })
  }

  // console.log(reviewForm)

  async function handleReviewSubmit(e) {
    e.preventDefault()

    const review = {
      user: user.data.user._id,
      movie: id,
      rating: reviewForm.rating,
      review: reviewForm.review
    }
    try {
      await dispatch(createReview(review))
    } catch (err) {
      console.log(err)
    }
  }

  // console.log(reviews)

  const reviewElement =
    reviews?.data?.reviews.length < 1 ? (
      <h2 id={styles.no_review} className="text-lg font-normal">
        {' '}
        Be the first to leave a review 😉
      </h2>
    ) : (
      reviews?.data?.reviews.map((el) => {
        // const reviewDate = el.timestamp
        // const timestamp = new Date(reviewDate).toLocaleDateString()

        return (
          <>
            <div className={styles.user_reviews} key={el._id}>
              <div className={styles.movie_review_user}>
                <h3 className=" ">
                  {' '}
                  {el.user.name} {new Date(el.timestamp).toLocaleDateString()}
                  💭💻
                </h3>
              </div>
              <p className={styles.movie_review_user_review}> {el.review}</p>
            </div>
            <hr />
          </>
        )
      })
    )

  return (
    <>
      <Header text="movies" />
      <div id={styles.movies}>
        <div id={styles.movie_obj} className="shadow-xl">
          <div id={styles.img_container}>
            <img className="" src={logo} alt="Man looking at item at a store" />
          </div>
          <div id={styles.movie_details}>
            <h1 className="text-md font-extrabold">
              {' '}
              <span className="font-extrabold">Title: </span>{' '}
              {movie?.data?.movie?.title}{' '}
            </h1>
            <h2>
              <span className="font-extrabold" id={styles.element}>
                Genre:
              </span>
              {movie?.data?.movie?.genre}
            </h2>
            <h2 className="font-extrabold text-sm">
              Year: {new Date(movie?.data?.movie?.year).getFullYear()}
            </h2>
            <h3 className="text-sm">
              {' '}
              <span className="font-extrabold">Directors: </span>{' '}
              {movie?.data?.movie?.directors.map((el, id) => (
                <span id={styles.element} className=" font-extrabold" key={id}>
                  {' '}
                  {el}{' '}
                </span>
              ))}
            </h3>
            <p className="text-sm">
              <span className="font-extrabold"> Cast: </span>{' '}
              {movie?.data?.movie?.cast.map((el, id) => (
                <span className=" font-extrabold" id={styles.element} key={id}>
                  {el}{' '}
                </span>
              ))}
            </p>
            <p className="text-sm font-extrabold">
              <span className="font-extrabold">Storyline: </span>
              {movie?.data?.movie?.storyline}
            </p>
          </div>
        </div>

        <div className={styles.movie_actors}></div>
        <div className={styles.movie_summary_details}></div>
        <div className={styles.movie_trivia}></div>
        <div className={styles.movie_photos}></div>
        <div className={styles.movie_cast}></div>
        <div className={styles.movie_similar}></div>
        <div className={styles.movie_awards}></div>

        <div className={styles.movie_reviews}>
          <h1 className={styles.movie_review_title}>Movie Reviews</h1>

          {reviewElement}

          <div className="new_review" id={styles.new_review}>
            <h2 className={styles.new_review_user}>
              What do you think 🤔? - LEAVE A REVIEW
            </h2>
            <form onSubmit={handleReviewSubmit}>
              <div className="rating rating-md" id={styles.rating}>
                <h3>RATE THE MOVIE: </h3>
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  className="mask mask-star-2 bg-orange-400"
                  onChange={handleChange}
                />
                <input
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  value="2"
                  onChange={handleChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  className="mask mask-star-2 bg-orange-400"
                  onChange={handleChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  className="mask mask-star-2 bg-orange-400"
                  onChange={handleChange}
                />
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  className="mask mask-star-2 bg-orange-400"
                  onChange={handleChange}
                />
              </div>
              <textarea
                className="textarea textarea-bordered"
                placeholder={
                  user ? 'Review 350 characters' : 'login to leave a review'
                }
                name="review"
                id={styles.review}
                value={reviewForm.review}
                onChange={handleChange}
              ></textarea>

              <button
                className="btn"
                id={styles.review_btn}
                disabled={user?.message === 'success' ? false : true}
                type="submit"
              >
                {' '}
                Add review +{' '}
              </button>
            </form>
          </div>

          {/* <>{reviewElement}</> */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Movie
