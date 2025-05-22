import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();

const corsHandler = cors({ origin: true });

interface SteamApiConfig {
    key: string;
    url: string;
    interface: string;
    method: string;
    version: string;
    includeAppInfo: boolean;
    includePlayedFreeGames: boolean;
    format: string;
}

const getSteamApiConfig = (): SteamApiConfig => ({
    key: process.env.STEAM_API_KEY || "",
    url: process.env.STEAM_API_URL || "",
    interface: process.env.STEAM_API_PLAYER_INTERFACE || "",
    method: process.env.STEAM_API_PLAYER_METHOD || "",
    version: process.env.STEAM_API_PLAYER_VERSION || "",
    includeAppInfo: process.env.STEAM_API_PLAYER_INCLUDE_APP_INFO === "TRUE",
    includePlayedFreeGames: process.env.STEAM_API_PLAYER_INCLUDE_PLAYED_FREE_GAMES === "TRUE",
    format: process.env.STEAM_API_FORMAT || "json",
});

exports.corsProxy = onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        try {
        const { steamid } = req.query;
        
        if (!steamid) {
            res.status(400).send("Parâmetro steamid é obrigatório");
            return;
        }

        const {
            key,
            url,
            interface: apiInterface,
            method,
            version,
            includeAppInfo,
            includePlayedFreeGames,
            format
        } = getSteamApiConfig();

        if (!key || !url || !apiInterface || !method || !version) {
            throw new Error("Configurações da API Steam incompletas");
        }

        const apiUrl = `${url}/${apiInterface}/${method}/${version}/`;
        const steamResponse = await axios.get(apiUrl, {
            params: {
                key,
                steamid,
                format,
                include_appinfo: includeAppInfo,
                include_played_free_games: includePlayedFreeGames
            }
        });
        if (steamResponse.status === 400) {
            throw new Error("User not found");
        }

        res.json(steamResponse.data);
        } catch (error) {
            logger.error("Erro ao acessar a API Steam", { error });
            const errorMessage = error instanceof Error ? error.message : String(error);
            res.status(500).send({ message: "Erro ao acessar a API Steam", error: errorMessage })
        }
    });
});