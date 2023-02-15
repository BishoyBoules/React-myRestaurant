import { useEffect, useState } from 'react'

import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ]

const url = 'https://react-http-a05e9-default-rtdb.firebaseio.com/meals.json'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(url).then()

      if (!response.ok) {
        throw new Error('there\'s a problem')
      }

      const responseData = await response.json()

      const loadedMeals = []

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }

      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])
  let mealsList = []

  if (isLoading) {
    mealsList = <p>Loading...</p>
  } else {
    mealsList = meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ))
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <Card>
          <p>{httpError}</p>
        </Card>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
