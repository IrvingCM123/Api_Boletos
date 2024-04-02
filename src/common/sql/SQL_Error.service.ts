import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SQL_ERROR } from '../helpers/SQL_ERROR.enum';
@Injectable()
export class SQL_ERRORS {
    constructor(
    ) {
     }

    RESULT_EMPTY(result: any) {
        if (result == undefined || result == null ) {
            throw new Error(SQL_ERROR.SQL_UNDIFENIED);
        }
    }
    
}
