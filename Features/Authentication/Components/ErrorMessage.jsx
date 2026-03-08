import { Text } from 'react-native'

const ErrorMessage = ({errorMessage}) => {
  return (
    <Text className="text-red-500 text-xs mt-1 ml-2 font-medium">
                {errorMessage}
    </Text>
  )
}

export default ErrorMessage