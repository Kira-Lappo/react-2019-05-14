import React, { Component } from "react";
import { List, Typography } from "antd";
import OrderListItem from "./order-list-item";
import { connect } from "react-redux";
import * as Enumerable from "linq";

const { Title } = Typography;

class OrderList extends Component {
  getTotalPrice = () => {
    const { cartItems } = this.props;
    return Enumerable.from(cartItems).sum(i => i.menuItem.price * i.count);
  };

  render() {
    const { cartItems } = this.props;
    return (
      <List
        footer={<Title>Total Cost: £{this.getTotalPrice()}</Title>}
        dataSource={cartItems}
        renderItem={item => (
          <List.Item key={item.menuItem.id}>
            <OrderListItem count={item.count} item={item.menuItem} />
          </List.Item>
        )}
      />
    );
  }
}

function mapToProps(state) {
  const { cart, restaurants } = state;

  // It's not efficient as I wanted
  // I'd like to keep dish item in a cart state
  // but it requires to update logic of cart reducer, dish item, etc
  const cartItems = Enumerable.from(restaurants)
    .selectMany(r => r.menu)
    .where(m => cart[m.id])
    .select(m => ({
      count: cart[m.id],
      menuItem: m
    }))
    .toArray();

  return {
    cartItems
  };
}

export default connect(mapToProps)(OrderList);
