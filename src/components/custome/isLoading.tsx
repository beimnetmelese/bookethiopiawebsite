import { Card, Skeleton, CardBody, SkeletonText } from "@chakra-ui/react";

function IsLoading() {
  return (
    <Card
      bg={"#F5F5F5"}
      margin={"20px"}
      maxW="sm"
      borderRadius="20px"
      overflow="hidden"
      boxShadow="lg"
      borderColor={"white"}
      className={"card"}
    >
      <Skeleton height={200}></Skeleton>
      <CardBody>
        <SkeletonText></SkeletonText>
      </CardBody>
    </Card>
  );
}

export default IsLoading;
