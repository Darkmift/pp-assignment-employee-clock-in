import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ShiftsDTO } from './dto/shift.index';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}
  // get all shifts
  @ApiOperation({ summary: 'Get all shifts' })
  @ApiResponse({ status: 200, description: 'Ok', type: ShiftsDTO })
  @Get(':natid')
  async getAllShifts(@Param('natid') natid) {
    return await this.shiftsService.getAllShiftsForUser(natid);
  }

  // create a shift
  @ApiOperation({ summary: 'Create a shift' })
  @ApiResponse({ status: 200, description: 'Ok', type: ShiftsDTO })
  @Post()
  async createShift(@Body() body) {
    return await this.shiftsService.createShift(body);
  }
}
