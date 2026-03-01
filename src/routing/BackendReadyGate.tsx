import { useQuery } from "@apollo/client/react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackendReadyDocument, type BackendReadyQuery } from "../graphql/gql/graphql";

type BackendReadyGateProps = {
    loadingMessage?: string;
};

export function BackendReadyGate({
    loadingMessage = "Loading. Waiting for backend...",
}: BackendReadyGateProps) {
    const [isBackendReady, setIsBackendReady] = useState(false);

    const { data } = useQuery<BackendReadyQuery>(BackendReadyDocument, {
        fetchPolicy: "no-cache",
        nextFetchPolicy: "no-cache",
        pollInterval: isBackendReady ? 0 : 3000,
        notifyOnNetworkStatusChange: true,
    });

    useEffect(() => {
        if (data?.__typename === "Query") {
            setIsBackendReady(true);
        }
    }, [data?.__typename]);

    if (!isBackendReady) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 2,
                }}
            >
                <Stack spacing={2} alignItems="center">
                    <CircularProgress />
                    <Typography color="text.secondary" textAlign="center">
                        {loadingMessage}
                    </Typography>
                </Stack>
            </Box>
        );
    }

    return <Outlet />;
}
