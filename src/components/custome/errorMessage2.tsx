import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

interface Props {
  description: string[] | never[];
}

function ErrorMessageArray({ description }: Props) {
  return (
    <>
      {description.map((item) => (
        <Alert marginTop={"10px"} status="error">
          <AlertIcon />
          <AlertDescription>{item}</AlertDescription>
        </Alert>
      ))}
    </>
  );
}

export default ErrorMessageArray;
