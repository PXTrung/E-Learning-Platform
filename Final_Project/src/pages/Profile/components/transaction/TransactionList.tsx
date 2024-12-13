import { Table, Text } from "@mantine/core";
import React from "react";
import useOrder from "../../../../hooks/order/useOrder";
import { formatDisplayDate } from "../../../../utils/formatDate";

const TransactionList = () => {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];

  const { getOrders } = useOrder();

  const { data } = getOrders();

  const rows = data?.data.map((element) => (
    <Table.Tr key={element.orderDate}>
      <Table.Td>{formatDisplayDate(element.orderDate)}</Table.Td>
      <Table.Td>
        {element.orderItems.map((i) => (
          <>
            <Text size="sm">{i.courseName}</Text>
            <br />
          </>
        ))}
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={600}>
          {element.totalPrice}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="md" fw={600} c={"teal.8"}>
          Success
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table horizontalSpacing="md" verticalSpacing="sm" striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Order Items</Table.Th>
          <Table.Th>Total Price</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default TransactionList;
