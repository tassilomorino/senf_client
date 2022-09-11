import Box from "../../atoms/box/Box";
import Typography from "../../atoms/typography/Typography";
import theme from "../../../styles/theme";

const ModalHeader = ({ ...options }) => {
	const { title, description } = options || {}
	return <Box flexDirection="column" padding={(title || description) && "20px"}>
		{(title || description) &&
			<Box flexDirection="column" gap="5px">
				{title && <Typography variant="h3">{title}</Typography>}
				{description && <Typography variant="bodyBg" color={theme.colors.greyscale.greyscale100}>{description}</Typography>}
			</Box>}
	</Box>
}
export default ModalHeader