import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const BACKEND_READY_QUERY = gql`
    query BackendReady {
        __typename
    }
`;

type BackendReadyData = {
    __typename?: string;
};

type BackendReadyGateProps = {
    loadingMessage?: string;
};

export function BackendReadyGate({
    loadingMessage = "Loading. Waiting for backend...",
}: BackendReadyGateProps) {
    const { data } = useQuery<BackendReadyData>(BACKEND_READY_QUERY, {
        fetchPolicy: "no-cache",
        nextFetchPolicy: "no-cache",
        pollInterval: 3000,
        notifyOnNetworkStatusChange: true,
    });

    const isBackendReady = data?.__typename === "Query";

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
