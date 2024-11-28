import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

interface Props {
  description: string;
}

function ErrorMessage({ description }: Props) {
  return (
    <Alert marginTop={"20px"} status="error">
      <AlertIcon />
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export default ErrorMessage;
