import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Payload } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({
            // jwt 토큰 분석
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "secret"
        })
    }

    // 토큰 검증
    validate(payload: Payload, done: VerifiedCallback){
        const user =  this.authService.tokenValidateUser(payload);

        if (!user){
            return done(new UnauthorizedException({message: 'user does not exist!'}));
        }
        
        return done(null, user);
    }
}