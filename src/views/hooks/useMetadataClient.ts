import { SequenceMetadata } from "@0xsequence/metadata";
import { useMemo } from "react";

import { useProjectAccessKey } from "./useProjectAccessKey";

export const useMetadataClient = () => {
  const projectAccessKey = useProjectAccessKey();

  const metadataClient = useMemo(() => {
    const clientUrl = "https://metadata.sequence.app";

    return new SequenceMetadata(clientUrl, projectAccessKey);
  }, [projectAccessKey]);

  return metadataClient;
};
