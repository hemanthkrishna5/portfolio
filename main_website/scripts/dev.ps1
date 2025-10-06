$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$activityPath = (Resolve-Path (Join-Path $root "..\activity_tracker")).Path
$timesheetPath = (Resolve-Path (Join-Path $root "..\timesheet_device")).Path

$jobs = @(
  @{ Name = "Activity Tracker"; Path = $activityPath; Command = "pnpm run dev" },
  @{ Name = "Timesheet Device"; Path = $timesheetPath; Command = "pnpm run dev" }
)

$processes = @()
foreach ($job in $jobs) {
  $location = $job.Path
  $command = $job.Command
  $title = $job.Name

  $psCommand = "Set-Location `"$location`"; $host.UI.RawUI.WindowTitle = '$title'; Write-Host '? $title' -ForegroundColor Cyan; $command"
  $processes += Start-Process powershell -ArgumentList '-NoExit','-NoLogo','-Command', $psCommand -PassThru
}

Write-Host "Launched $($processes.Count) terminals. Close them to stop the dev servers." -ForegroundColor Green
Wait-Process -Id ($processes | Select-Object -ExpandProperty Id)
