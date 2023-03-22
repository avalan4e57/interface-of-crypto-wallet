import { supportedChainNames } from "@/constants/supportedChainsMappings";
import { SupportedChains } from "@/enums";
import { List, ListItem } from "@mui/material";
import { FC } from "react";

const SupportedChainsList: FC = () => {
  const supportedChainsNames = Object.values(supportedChainNames).filter(
    (name) => name !== supportedChainNames[SupportedChains.NOT_SUPPORTED]
  );

  return (
    <List>
      {supportedChainsNames.map((name, index) => (
        <ListItem key={index}>{name}</ListItem>
      ))}
    </List>
  );
};

export default SupportedChainsList;
