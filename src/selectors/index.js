import { createSelector } from "reselect";
import _ from "lodash";

export const cartSelector = state => state.cart;
export const restaurantsSelector = state => state.restaurants;
export const dishesSelector = state => state.dishes;
export const reviewsSelector = state => state.reviews;
export const usersSelector = state => state.users;

export const reviewIdPropSelector = (_, ownProps) => ownProps.reviewId;
export const restaurantIdPropSelector = (_, ownProps) => ownProps.restaurantId;
export const dishIdPropSelector = (_, ownProps) => ownProps.dishId;

export const createRestaurantSelector = () =>
  createSelector(
    restaurantsSelector,
    restaurantIdPropSelector,
    (restaurants, id) => {
      return _.find(restaurants, r => r.id === id);
    }
  );

export const createReviewSelector = () =>
  createSelector(
    reviewsSelector,
    reviewIdPropSelector,
    (reviews, id) => {
      return _.find(reviews, r => r.id === id);
    }
  );

export const createRestaurantReviewsSelector = () =>
  createSelector(
    reviewsSelector,
    createRestaurantSelector(),
    (reviews, restaurant) => {
      const restaurantReviews = reviews.filter(r =>
        restaurant.reviews.includes(r.id)
      );
      return restaurantReviews;
    }
  );

export const createReviewIdsSelector = () =>
  createSelector(
    createRestaurantReviewsSelector(),
    reviews => {
      return reviews.map(r => r.id);
    }
  );

export const createDishSelector = () =>
  createSelector(
    dishesSelector,
    dishIdPropSelector,
    (dishes, id) => {
      return dishes.find(dish => dish.id === id);
    }
  );

export const createRestaurantAverageRateSelector = () =>
  createSelector(
    createRestaurantReviewsSelector(),
    reviews => {
      return (
        reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length
      );
    }
  );

export const createReviewAuthorSelector = () =>
  createSelector(
    createReviewSelector(),
    usersSelector,
    (review, users) => {
      return _.find(users, u => u.id === review.userId);
    }
  );

export const createDishCartAmountSelector = () =>
  createSelector(
    cartSelector,
    dishIdPropSelector,
    (cart, dishId) => {
      return cart[dishId] || 0;
    }
  );

export const createRestauranMenusSelector = () =>
  createSelector(
    createRestaurantSelector(),
    dishesSelector,
    (restaurant, dishes) => {
      return _.filter(dishes, d => restaurant.menu.includes(d.id));
    }
  );

export const createCartDishesSelector = () =>
  createSelector(
    cartSelector,
    dishesSelector,
    (cart, dishes) => {
      let cartDishes = _.filter(dishes, d => cart[d.id]);
      cartDishes = _.map(cartDishes, d => {
        const amount = cart[d.id];
        const totalDishPrice = amount * d.price;
        return {
          ...d,
          amount,
          totalDishPrice
        };
      });

      const totalPrice = _.sumBy(cartDishes, d => d.totalDishPrice);

      return {
        dishes: cartDishes,
        totalPrice
      };
    }
  );
