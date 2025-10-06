$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Resolve-Path (Join-Path $scriptDir '..')
$activityPath = Resolve-Path (Join-Path $root 'activity_tracker')
$timesheetPath = Resolve-Path (Join-Path $root 'timesheet_device')

$jobs = @(
  @{ Name = 'Activity Tracker'; Path = $activityPath; Command = 'pnpm run dev' },
  @{ Name = 'Timesheet Device'; Path = $timesheetPath; Command = 'pnpm run dev' }
)

$processes = @()
foreach ($job in $jobs) {
  $location = $job.Path
  $command = $job.Command
  $title = $job.Name
  $psCommand = "Set-Location `"$location`"; Write-Host '? $title' -ForegroundColor Cyan; $command"
  $fullCommand = "powershell -NoExit -NoLogo -NoProfile -Command `"$psCommand`""
  $processes += Start-Process "cmd.exe" -ArgumentList "/c start `"$title`" $fullCommand" -PassThru
}

if ($processes.Count -gt 0) {
  Write-Host "Launched $($processes.Count) development terminals. Close them to stop the services." -ForegroundColor Green
  Wait-Process -Id ($processes | Select-Object -ExpandProperty Id)
}
